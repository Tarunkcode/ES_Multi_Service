using es_url_shortner.data_access.Model.Domain;
using es_url_shortner.data_access.Model.DTO;
using es_url_shortner.service.IRepository;
using es_url_shortner.service.Repositories;
using es_url_shortner.utility.Utilities;
using excellentsoftwares_short_url.app.DTO;
using excellentsoftwares_short_url.app.Migrations;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Net;
using System.Threading.Tasks;


namespace excellentsoftwares_short_url.app.Controllers
{
    [ApiController]
    [EnableCors("cors_policy")]
    [Route("api/[action]")]
    public class ValuesController : ControllerBase
    {
        public readonly url_shortnerContext _db;
        public readonly IShortLink _sl;
        public readonly IQrService _qr;
        public readonly IUser _user;
        public readonly ICaptcha _captcha;

        private string CaptchaText;

        public ValuesController(IShortLink sl, url_shortnerContext db, IQrService qr, IUser user, ICaptcha captcha)
        {
            _sl = sl;
            _db = db;
            _qr = qr;
            _user = user;
            _captcha = captcha;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var link_details = await _sl.FetchAllLinksDetails();
            if (link_details == null)
            {
                return NotFound();
            }
            //return DTO
            List<Add_Short_Links> links_list = new List<Add_Short_Links>();

            link_details.ToList().ForEach(link =>
            {
                var linkDTO = new Add_Short_Links()
                {
                    Name = link.Name,
                    Path = link.Path,
                    DestinationUrl = link.DestinationUrl,
                    DomainUrl = link.DomainUrl
                };
                links_list.Add(linkDTO);
            });
            return Ok(links_list);
        }


        [HttpPost]
        public async Task<IActionResult> GenerateShortLink([FromBody] Add_Short_Links linkSet)
        {
            int res = 0;
            try
            {
                res = await new Short_Link(_db).CreateShortLinks(linkSet.Name, linkSet.Path, linkSet.DestinationUrl, linkSet.DomainUrl);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message.ToString());
            }


        }


        [HttpPost]
        public async Task<IActionResult> CreateQRCode([FromBody] QR body)
        {
            try
            {
                string uri = await _qr.GenerateQr(body.qrStr);
                DTO.qr obj = new DTO.qr();
                obj.fetchCode = 1;
                obj.uriStr = uri;
                return Ok(obj);
            }
            catch (Exception ex)
            {
                DTO.qr obj = new DTO.qr();
                obj.fetchCode = -1;
                obj.uriStr = "";
                obj.errMsg = ex.Message.ToString();
                return BadRequest(obj);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddNewOneUser([FromBody] User UserSet)
        {
            try
            {
                bool res = await _user.AddUserAsync(UserSet);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }
        [HttpGet]
        public async Task<User> FindUserIsAlreadyExistOrNot(string uid)
        {

            var user = await _db.UserTable.FirstOrDefaultAsync(x => x.userId == uid);
            return user;

        }


        [HttpPost]
        public async Task<IActionResult> GenerateCaptcha([FromBody] UserSecretKey k)
        {
            try
            {
                string key = k.key;
                User user = await FindUserIsAlreadyExistOrNot(key);
                if(user == null)
                {
                    return NotFound("Invalid Key Found");
                }
                if (user.userId == key)
                {
                    string captcha = _captcha.GenerateCaptchaCode().ToString();

                    SingletonCache cache = SingletonCache.GetInstance();
                    DateTimeOffset now = (DateTimeOffset)DateTime.UtcNow;
                    string assignedBlock = now.ToUnixTimeSeconds().ToString();

                    cache.AddOrUpdate(assignedBlock, captcha);

                    //HttpContext.Session.SetString(assignedBlock, result);
                    string base64 = _captcha.TextToImageCaptcha(captcha);

                    string uri = $"data:image/png;base64,{base64}";

                    ReturnCaptcha obj = new ReturnCaptcha();
                    obj.captchaBase64 = uri;
                    obj.accesskey = assignedBlock;
                    return Ok(obj);
                }
                else
                {
                    string msg = "Invalid Captcha Filled";
                    ReturnCaptcha obj = new ReturnCaptcha();
                    obj.err = msg;
                    return BadRequest(obj);
                }

            }
            catch (Exception ex)
            {
                string msg = ex.Message.ToString();
                ReturnCaptcha obj = new ReturnCaptcha();
                obj.err = msg;
                return BadRequest(msg);
            }
        }

        [HttpGet]
        public async Task<IActionResult>  ValidateCaptcha (string key,string accessKey, string input) {
            try
            {
                User user = await FindUserIsAlreadyExistOrNot(key);
                ValidateCaptcha isvalid = new ValidateCaptcha();
                    SingletonCache cache = SingletonCache.GetInstance();
                if(user.userId == key) {
                    //string foundSession = HttpContext.Session.GetString(accessKey);
                    var foundSession = cache.Get(accessKey).ToString();
                    if (foundSession == null || foundSession == "")
                  {
                        isvalid.message = "Captcha Session Expired";
                        isvalid.status = -1;
                        cache.Remove(accessKey);
                        return Ok(isvalid);
                  }
                    if(foundSession == input)
                    {
                        isvalid.message = "Captcha Verified Successfully";
                        isvalid.status = 1;
                        cache.Remove(accessKey);
                        return Ok(isvalid);

                    }
                    else
                    {
                        isvalid.message = "Invalid Captch Filled";
                        isvalid.status = 0;

                        return Ok(isvalid);
                    }

                }
                else
                {
                    isvalid.message = "Invalid Key Provided";
                        isvalid.status = 401;
                        cache.Remove(accessKey);
                    return Ok(isvalid);
                }

            }catch (Exception ex) { return  BadRequest(ex.Message.ToString()); }
           
        }
    }
}

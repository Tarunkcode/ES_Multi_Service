using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es_url_shortner.data_access.Profiles
{
    public class LinksProfile : Profile
    {
        public LinksProfile()
        {

            CreateMap<Model.Domain.LinksDatum, Model.DTO.Add_Short_Links>()
                .ReverseMap();
        }
    }
}

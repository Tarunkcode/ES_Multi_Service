using Microsoft.EntityFrameworkCore.Migrations;

namespace es_url_shortner.data_access.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LinksData",
                columns: table => new
                {
                    LinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DestinationUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DomainUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinksData", x => x.LinkId);
                });

            migrationBuilder.CreateTable(
                name: "QRCodesUri",
                columns: table => new
                {
                    qrId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    qrStr = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QRCodesUri", x => x.qrId);
                });

            migrationBuilder.CreateTable(
                name: "user_table",
                columns: table => new
                {
                    srno = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    uName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    phoneNo = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true),
                    password = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    isCaptchaEnable = table.Column<bool>(type: "bit", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_table", x => x.srno);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LinksData");

            migrationBuilder.DropTable(
                name: "QRCodesUri");

            migrationBuilder.DropTable(
                name: "user_table");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class AddedDefaultValueToGender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers",
                sql: "[Gender] IN(0, 1, 2)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers",
                sql: "[Gender] IN(1, 2)");
        }
    }
}

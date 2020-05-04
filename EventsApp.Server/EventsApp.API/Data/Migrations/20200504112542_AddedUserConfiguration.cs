using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class AddedUserConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateCheckConstraint(
                name: "CK_Friends_Status_Enum_Constraint",
                table: "Friends",
                sql: "[Status] IN(1, 2)");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers",
                sql: "[Gender] IN(1, 2)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Friends_Status_Enum_Constraint",
                table: "Friends");

            migrationBuilder.DropCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers");
        }
    }
}

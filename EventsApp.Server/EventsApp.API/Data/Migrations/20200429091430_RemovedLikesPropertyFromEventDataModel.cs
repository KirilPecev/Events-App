using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class RemovedLikesPropertyFromEventDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Events_EventId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_EventId",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Likes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "Likes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Likes_EventId",
                table: "Likes",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Events_EventId",
                table: "Likes",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

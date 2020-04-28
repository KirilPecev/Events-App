using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class AddedLikesPropertyToEventModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Likes",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Shares",
                table: "Events");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Shares",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

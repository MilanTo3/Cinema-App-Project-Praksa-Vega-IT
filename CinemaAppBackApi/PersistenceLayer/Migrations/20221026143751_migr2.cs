using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersistenceLayer.Migrations
{
    public partial class migr2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenreMovie");

            migrationBuilder.AddColumn<long>(
                name: "movieId",
                table: "Genre",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Genre_movieId",
                table: "Genre",
                column: "movieId");

            migrationBuilder.AddForeignKey(
                name: "FK_Genre_Movie_movieId",
                table: "Genre",
                column: "movieId",
                principalTable: "Movie",
                principalColumn: "movieId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Genre_Movie_movieId",
                table: "Genre");

            migrationBuilder.DropIndex(
                name: "IX_Genre_movieId",
                table: "Genre");

            migrationBuilder.DropColumn(
                name: "movieId",
                table: "Genre");

            migrationBuilder.CreateTable(
                name: "GenreMovie",
                columns: table => new
                {
                    genreId = table.Column<long>(type: "bigint", nullable: false),
                    movieId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenreMovie", x => new { x.genreId, x.movieId });
                });
        }
    }
}

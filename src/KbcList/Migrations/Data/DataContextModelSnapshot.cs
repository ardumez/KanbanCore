using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using KbcList.Models.Database;

namespace KbcList.Migrations.Data
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KbcList.Models.BoardModels.Board", b =>
                {
                    b.Property<int>("BoardID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BoardName");

                    b.HasKey("BoardID");

                    b.ToTable("Boards");
                });
        }
    }
}

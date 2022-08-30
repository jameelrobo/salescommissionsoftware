using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BarcoSales.Model
{
    public partial class BarcoSalesCommissionContext : DbContext
    {
        public BarcoSalesCommissionContext()
        {
        }

        public BarcoSalesCommissionContext(DbContextOptions<BarcoSalesCommissionContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CommissionRules> CommissionRules { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Factory> Factory { get; set; }
        public virtual DbSet<FactoryCategory> FactoryCategory { get; set; }
        public virtual DbSet<SalesPerson> SalesPerson { get; set; }
        public virtual DbSet<SalesTrasaction> SalesTrasaction { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=CEQ-ICT-LT-010; Database=BarcoSalesCommission; User ID=sa;Password=saa;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CommissionRules>(entity =>
            {
                entity.Property(e => e.CommisionRate).HasColumnType("money");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.CommissionRules)
                    .HasForeignKey(d => d.CustId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommissionRules_Customer");

                entity.HasOne(d => d.Factory)
                    .WithMany(p => p.CommissionRules)
                    .HasForeignKey(d => d.FactoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommissionRules_Factory");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustId)
                    .HasName("PK_Customer_CustId");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CustAddress).HasMaxLength(256);

                entity.Property(e => e.CustCity).HasMaxLength(50);

                entity.Property(e => e.CustCompanyCode).HasMaxLength(50);

                entity.Property(e => e.CustCompanyName).HasMaxLength(50);

                entity.Property(e => e.CustContactPerson).HasMaxLength(50);

                entity.Property(e => e.CustEmailId).HasMaxLength(50);

                entity.Property(e => e.CustFaxNo).HasMaxLength(50);

                entity.Property(e => e.CustMobileNo).HasMaxLength(50);

                entity.Property(e => e.CustName)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.CustPhoneNo).HasMaxLength(50);

                entity.Property(e => e.CustPrincCode).HasMaxLength(50);

                entity.Property(e => e.CustState).HasMaxLength(50);

                entity.Property(e => e.CustTerritory).HasMaxLength(50);

                entity.Property(e => e.CustZip).HasMaxLength(50);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Factory>(entity =>
            {
                entity.Property(e => e.CommissionRate).HasColumnType("money");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FactoryName)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Princcode)
                    .HasColumnName("princcode")
                    .HasMaxLength(256);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.FactoryCategory)
                    .WithMany(p => p.Factory)
                    .HasForeignKey(d => d.FactoryCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Factory_FactoryCategory");
            });

            modelBuilder.Entity<FactoryCategory>(entity =>
            {
                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FactoryCategoryName)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<SalesPerson>(entity =>
            {
                entity.HasKey(e => e.SalesId)
                    .HasName("PK_SalesPerson_SalesId");

                entity.Property(e => e.City).HasMaxLength(50);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FaxNo).HasMaxLength(50);

                entity.Property(e => e.JoiningDate).HasColumnType("datetime");

                entity.Property(e => e.MobileNo).HasMaxLength(50);

                entity.Property(e => e.PhoneNo).HasMaxLength(50);

                entity.Property(e => e.PrincCode).HasMaxLength(50);

                entity.Property(e => e.SalesPersonAddress).HasMaxLength(256);

                entity.Property(e => e.SalesPersonDesignation).HasMaxLength(256);

                entity.Property(e => e.SalesPersonEmailId).HasMaxLength(50);

                entity.Property(e => e.SalesPersonName)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.State).HasMaxLength(50);

                entity.Property(e => e.Territory).HasMaxLength(50);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Zip).HasMaxLength(50);
            });

            modelBuilder.Entity<SalesTrasaction>(entity =>
            {
                entity.HasKey(e => e.TrasactionId)
                    .HasName("PK_SalesTrasaction_TrasactionId");

                entity.Property(e => e.ActualCommAmt).HasColumnType("money");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ExtPrice).HasColumnType("money");

                entity.Property(e => e.GrossCommAmt).HasColumnType("money");

                entity.Property(e => e.GrossCommRate).HasColumnType("money");

                entity.Property(e => e.ShipToAddress).HasMaxLength(50);

                entity.Property(e => e.ShipToCity).HasMaxLength(50);

                entity.Property(e => e.ShipToName).HasMaxLength(50);

                entity.Property(e => e.ShipToState).HasMaxLength(50);

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.SalesTrasaction)
                    .HasForeignKey(d => d.CustId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SalesTrasaction_Customer");

                entity.HasOne(d => d.Factory)
                    .WithMany(p => p.SalesTrasaction)
                    .HasForeignKey(d => d.FactoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SalesTrasaction_Factory");

                entity.HasOne(d => d.Sales)
                    .WithMany(p => p.SalesTrasaction)
                    .HasForeignKey(d => d.SalesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SalesTrasaction_SalesPerson");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

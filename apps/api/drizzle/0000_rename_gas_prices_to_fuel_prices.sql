-- The table already exists (created by the old be-node backend as gas_prices). Instead of the generated
-- CREATE TABLE, this turns it into the fuel_prices table described in meta/0000_snapshot.json, keeping its data.
ALTER TABLE "gas_prices" RENAME TO "fuel_prices";--> statement-breakpoint
ALTER TABLE "fuel_prices" RENAME CONSTRAINT "gas_prices_pkey" TO "fuel_prices_pkey";--> statement-breakpoint
ALTER SEQUENCE "gas_prices_id_seq" RENAME TO "fuel_prices_id_seq";--> statement-breakpoint
-- Stored values are UTC wall time, so read them as UTC when adding the time zone.
ALTER TABLE "fuel_prices" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at" AT TIME ZONE 'UTC';--> statement-breakpoint
ALTER TABLE "fuel_prices" ALTER COLUMN "station_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fuel_prices" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fuel_prices" ALTER COLUMN "city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fuel_prices" ALTER COLUMN "street" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fuel_prices" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "fuel_prices" ALTER COLUMN "updated_at" SET NOT NULL;

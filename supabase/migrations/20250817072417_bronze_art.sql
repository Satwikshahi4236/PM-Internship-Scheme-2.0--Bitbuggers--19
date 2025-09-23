CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`date_of_birth` text,
	`emergency_contact` text,
	`address` text,
	`medical_history` text,
	`profile_image` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `medicines` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`dosage` text NOT NULL,
	`frequency` text NOT NULL,
	`instructions` text,
	`start_date` text,
	`end_date` text,
	`next_dose` text,
	`taken` integer DEFAULT false,
	`reminder_enabled` integer DEFAULT true,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `appointments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`doctor_name` text NOT NULL,
	`specialty` text,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`location` text,
	`notes` text,
	`status` text DEFAULT 'scheduled',
	`reminder_enabled` integer DEFAULT true,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `family_members` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`relationship` text NOT NULL,
	`phone` text,
	`email` text,
	`emergency_contact` integer DEFAULT false,
	`profile_image` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`sender_id` text,
	`sender_name` text NOT NULL,
	`content` text NOT NULL,
	`type` text NOT NULL,
	`read` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `health_vitals` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`type` text NOT NULL,
	`value` text NOT NULL,
	`unit` text,
	`notes` text,
	`recorded_at` text DEFAULT CURRENT_TIMESTAMP,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`medicine_reminders` integer DEFAULT true,
	`appointment_reminders` integer DEFAULT true,
	`family_notifications` integer DEFAULT true,
	`emergency_alerts` integer DEFAULT true,
	`theme` text DEFAULT 'light',
	`language` text DEFAULT 'en',
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
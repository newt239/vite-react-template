CREATE TABLE `messages` (
	`body` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);

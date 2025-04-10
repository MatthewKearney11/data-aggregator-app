-- SQL Script to create tables for the Data Aggregator App

-- Drop tables if they exist (optional, useful for resetting)
-- DROP TABLE IF EXISTS fetched_data;
-- DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the fetched_data table (placeholder for now)
CREATE TABLE fetched_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Link to the user who fetched/owns the data
    source VARCHAR(255) NOT NULL, -- Identifier for the data source (e.g., 'rss_feed_url', 'twitter_api', 'website_scrape')
    source_identifier TEXT, -- Specific identifier within the source (e.g., the actual URL, API query term)
    raw_content TEXT NOT NULL, -- The raw data fetched from the source
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- When the data was fetched
    processed_at TIMESTAMP WITH TIME ZONE, -- When the data was processed/summarized by AI
    summary TEXT, -- The AI-generated summary or analysis
    metadata JSONB -- Optional: Store additional metadata about the fetched item (e.g., article author, tweet ID)
);

-- Optional: Add indexes for performance
CREATE INDEX idx_fetched_data_user_id ON fetched_data(user_id);
CREATE INDEX idx_fetched_data_source ON fetched_data(source);
CREATE INDEX idx_fetched_data_fetched_at ON fetched_data(fetched_at);

-- Grant permissions (adjust 'your_app_user' as needed)
-- GRANT ALL PRIVILEGES ON TABLE users TO your_app_user;
-- GRANT ALL PRIVILEGES ON TABLE fetched_data TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE fetched_data_id_seq TO your_app_user;

-- You might need to connect to your PostgreSQL instance using a tool like psql or pgAdmin
-- and run the contents of this file against your target database.
-- Remember to replace 'your_app_user' with the actual database user your backend application will use.

DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organizations;

-- =========================
-- TABLES
-- =========================

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    organization_description TEXT,
    organization_image VARCHAR(255)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    project_title VARCHAR(150) NOT NULL,
    project_description TEXT,
    project_location VARCHAR(150),
    project_date DATE,
    FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

-- =========================
-- ORGANIZATIONS
-- =========================

INSERT INTO organizations (organization_name, organization_description, organization_image)
VALUES
('Helping Hands', 'Community support and outreach programs.', 'org1.jpg'),
('Green Earth', 'Environmental clean-up initiatives.', 'org2.jpg'),
('Bright Future', 'Education and youth mentoring.', 'org3.jpg');

-- =========================
-- PROJECTS
-- =========================

INSERT INTO projects (organization_id, project_title, project_description, project_location, project_date)
VALUES
(1, 'Food Drive', 'Collect food donations for families in need.', 'Rexburg, ID', '2025-03-10'),
(1, 'Clothing Donation Event', 'Organize and distribute donated clothes.', 'Idaho Falls, ID', '2025-03-15'),
(2, 'Park Cleanup', 'Clean litter and beautify the city park.', 'Rexburg, ID', '2025-04-02'),
(2, 'Tree Planting', 'Plant trees in public spaces.', 'Idaho Falls, ID', '2025-04-06'),
(3, 'After School Tutoring', 'Tutor children in math and reading.', 'Rexburg, ID', '2025-05-01');

-- =========================
-- CATEGORIES
-- =========================

INSERT INTO categories (category_name)
VALUES
('Community Service'),
('Environment'),
('Education');

-- =========================
-- PROJECT ↔ CATEGORY
-- =========================

INSERT INTO project_categories (project_id, category_id)
VALUES
(1,1),
(2,1),
(3,2),
(4,2),
(5,3);

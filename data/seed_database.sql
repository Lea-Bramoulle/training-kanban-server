BEGIN;

INSERT INTO "board" (id, name)
VALUES
    (1, 'Platform Launch'),
    (2, 'Marketing plan'),
    (3, 'Team Front-End'),
    (4, 'Team Back-End')
;

INSERT INTO "list" (id, name, color, position, board_id)
VALUES 
    (1, 'To do', '49C4E5', 0, 1),
    (2, 'Doing', '49C4E5', 1, 1),
    (3, 'Done', '49C4E5', 1, 1)
;

INSERT INTO "task" (id, name, description, position, list_id)
VALUES
    (1, 'Build UI for search', 'Lorem Ipsum si amet dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 0, 1),
    (2, 'Build Setting UI', 'Lorem Ipsum si amet consectetur adipiscing elit', 0, 1),
    (3, 'Build UI for unboarding flow', 'Lorem Ipsum si amet', 0, 1),
    (4, 'Design onboarding flow', 'Lorem Ipsum si amet sed do eiusmod tempor incididunt', 0, 2),
    (5, 'Add search end-points', 'Lorem Ipsum si amet enim ad minim veniam', 0, 2),
    (6, 'Create wireframes prototypes', 'Lorem Ipsum si amet quis nostrud exercitation ullamco laboris nisi', 0, 3)
;

INSERT INTO "subtask" (id, description, is_done, task_id)
VALUES 
    (1, 'consectetur adipiscing elit', true, 1),
    (2, 'sed do eiusmod tempor incididunt', false, 1),
    (3, 'ut labore et dolore magna aliqua', false, 1),
    (4, 'enim ad minim veniam', true, 2),
    (5, 'quis nostrud exercitation ullamco laboris nisi', false, 2)
;

INSERT INTO "label" (id, name, color) 
VALUES 
    (1, 'Urgent', 'red'), 
    (2, 'En retard', 'orange'), 
    (3, 'Prioritaire', 'red'),
    (4, 'Review', 'yellow'),
    (5, 'Bug', 'purple')
;

INSERT INTO "task_has_label" (task_id, label_id)
VALUES 
    (1,3),
    (2,1),
    (2,4),
    (3,1)
;

SELECT setval('board_id_seq', (SELECT MAX(id) from "board"));
SELECT setval('list_id_seq', (SELECT MAX(id) from "list"));
SELECT setval('task_id_seq', (SELECT MAX(id) from "task"));
SELECT setval('subtask_id_seq', (SELECT MAX(id) from "subtask"));
SELECT setval('label_id_seq', (SELECT MAX(id) from "label"));



COMMIT;
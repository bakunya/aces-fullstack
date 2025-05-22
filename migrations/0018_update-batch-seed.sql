-- Migration number: 0018 	 2025-05-22T04:05:33.722Z

-- Update token untuk Batch 1
UPDATE batches
SET token = 'ACS0001'
WHERE uuid = 'd4acbe9d-28c8-4b25-9f29-6a53f4cbceda1';

-- Update token untuk Batch 2
UPDATE batches
SET token = 'ACS0002'
WHERE uuid = '87f7f9fc-7315-4c0f-a6fc-cdde277754cf';
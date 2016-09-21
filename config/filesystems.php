<?php

return [
    'default' => 'local',
    'disks' => [
        'local' => [
            'driver' => 'local',
            'root'   => storage_path('app'),
        ],
        'forms' => [
            'driver' => 'local',
            'root'   => storage_path('forms'),

            /* TODO: Use s3 instead of disk in production and staging
               'driver' => 's3',
               'key' => env('S3_KEY'),
               'secret' => env('S3_SECRET'),
               'region' => env('S3_REGION'),
               'bucket' => env('S3_BUCKET_FORMS'), */
        ],
    ],
];

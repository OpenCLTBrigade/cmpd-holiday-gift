<?php

return [
    'default' => 'local',
    'disks' => [
        'local' => [
            'driver' => 'local',
            'root'   => storage_path('app'),
        ],
        // store household attachments on S3 if S3_KEY is set in .env
        // otherwise store them on disk
        'forms' => (
                    env('S3_KEY') ? [
                        'driver' => 's3',
                        'key' => env('S3_KEY'),
                        'secret' => env('S3_SECRET'),
                        'region' => env('S3_REGION'),
                        'bucket' => env('S3_BUCKET_FORMS'),
                    ] : [
                        'driver' => 'local',
                        'root'   => storage_path('forms'),
                    ]),
    ],
];

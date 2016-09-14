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
        ],
    ],
];

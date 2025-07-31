<?php

namespace App\Helpers;

class MessageHelper
{
    public static function resultAuth($success, $message, $data = null, $code = 200)
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data'    => $data
        ], $code);
    }
}

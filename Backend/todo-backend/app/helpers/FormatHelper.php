<?php

namespace App\Helpers;

class FormatHelper
{
    public static function formatResultAuth($user)
    {
        return [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email
            // tambahkan field lain kalau perlu
        ];
    }
}

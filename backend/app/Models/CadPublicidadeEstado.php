<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CadPublicidadeEstado extends Model
{
    protected $table = 'cad_publicidade_estado';

    protected $fillable = ['id_publicidade', 'id_estado'];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CadEstado extends Model
{
    protected $table = 'cad_estado';

    protected $fillable = ['descricao', 'sigla'];

    public function publicidades()
    {
        return $this->belongsToMany(CadPublicidade::class, 'cad_publicidade_estado', 'id_estado', 'id_publicidade');
    }
}
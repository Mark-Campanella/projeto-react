<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuariomodel extends CI_Model {
    function __construct() {

    }

    public function listar() {
        $this->db->select('id, nome, status, email, data_inc, data_alt');
        $this->db->from('usuario');

        $this->db->order_by('nome','asc');
        $query = $this->db->get();
        $res = $query->result();
        return $res;
    }

    public function cadastrar($data) {
        $this->db->insert('usuario', $data);
    }

    public function alterar($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('usuario', $data);
    }

    public function excluir($id) {
        $this->db->where('id', $id);
        $this->db->delete('usuario');
    }    
}
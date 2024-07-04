<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categoriamodel extends CI_Model {
    function __construct() {

    }

    public function listar() {
        $this->db->select('id, nome, status, data_inc, data_alt');
        $this->db->from('categoria');

        $this->db->order_by('nome','asc');
        $query = $this->db->get();
        $res = $query->result();
        return $res;
    }

    public function cadastrar($data) {
        $this->db->insert('categoria', $data);
    }

    public function alterar($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('categoria', $data);
    }

    public function excluir($id) {
        $this->db->where('id', $id);
        $this->db->delete('categoria');
    }    
}
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Fabricantemodel extends CI_Model {
    function __construct() {

    }

    public function listar() {
        $this->db->select('id, nome, status, endereco, cidade, estado, bairro, data_inc, data_alt');
        $this->db->from('fabricante');

        $this->db->order_by('nome','asc');
        $query = $this->db->get();
        $res = $query->result();
        return $res;
    }

    public function cadastrar($data) {
        $this->db->insert('fabricante', $data);
    }

    public function alterar($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('fabricante', $data);
    }

    public function excluir($id) {
        $this->db->where('id', $id);
        $this->db->delete('fabricante');
    }    
}
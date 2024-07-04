import { withRouter } from 'react-router';
import Api from '../../services';
import React, { useState, useEffect } from 'react';
//import DataTable from 'react-data-table-component';
import LoadingOverlay from 'react-loading-overlay';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useToasts } from 'react-toast-notifications';
import DataTable from 'react-data-table-component';

const Teste = () => {
    const { addToast } = useToasts();
    const [ fabricantes, setFabricantes ] = useState([]);
    const [ modal, setModal ] = useState(false);
    const [ formFabricante, setFormFabricante ] = useState({});

    useEffect(() => {
        getListar();
    }, []);

    function adicionar() {
        setFormFabricante({});
        setModal(true);
    }

    function editar(fabricante) {
        var linha = JSON.parse(JSON.stringify(fabricante));

        setFormFabricante(linha);
        setModal(true);
    }

    function excluir(fabricante) {
        var linha = JSON.parse(JSON.stringify(fabricante));

        Swal.fire({
            icon: 'question',
            title: 'Confirmação',
            html: 'Deseja excluir o registro?',
            showCancelButton: true,
            confirmButtonText: 'Sim, confirmar!',
            cancelButtonText: 'Não, Cancelar.'
        }).then((result) => {
            if (result.isConfirmed) {
                Api.post('fabricante/excluir', linha).then (
                    rps => {
                        if (rps.data.status == true) {
                            addToast(rps.data.mensagem, {
                                appearance: "success",
                                autoDismiss: true,
                                autoDismissTimeout: 2000
                            });
                            getListar();
                        }
                    })
            }
        })
    }

    function fecharModal() {
        setModal(false);
    }

    function salvar() {
        Api.post('fabricante/cadastrar', formFabricante).then(rps => {
            if (rps.data.status === true) {
                addToast(rps.data.mensagem, {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 2000
                });
                setModal(false);
                getListar();
            } else {
                Swal.fire({
                    title: "Erro!",
                    icon: "error",
                    html: rps.data.erros,
                    showCloseButton:true,
                    showCancelButton: false,
                })
            }

        })
    }

    function getListar() {
        Api.get('fabricante/listar').then(rps => {
            setFabricantes(rps.data.obj);
        })
    }

    const data = fabricantes;
    const columns = [
        {
            name: <th>Código</th>,
            selector: 'id',
            sortable: true,
            width: '5%',
            center: true,
        },
        {
            name: <th>Nome</th>,
            selector: 'nome',
            sortable: true,
            width: '10%',
        },
        {
            name: <th>Endereço</th>,
            selector: 'endereco',
            sortable: true,
            width: '10%',
        },
        {
            name: <th>Bairro</th>,
            selector: 'bairro',
            sortable: true,
            width: '10%',
        },
        {
            name: <th>Cidade</th>,
            selector: 'cidade',
            sortable: true,
            width: '10%',
        },
        {
            name: <th>Estado</th>,
            selector: 'estado',
            sortable: true,
            width: '5%',
        },
        {
            name: <th>Status</th>,
            selector: 'status',
            sortable: true,
            width: '5%',
        },
        {
            name: <th>Data Inclusão</th>,
            selector: 'data_inc',
            sortable: true,
            width: '13%',
            center: true,
        },
        {
            name: <th>Data Alteração</th>,
            selector: 'data_alt',
            sortable: true,
            width: '13%',
            center: true,
        },
        {
            name: <th>Ações</th>,
            cell: (row) => {
                return (
                    <>
                    <button className="btn btn-warning btn-sm" onClick={e => {editar(row)}}>Alterar</button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={e => {excluir(row)}}>Excluir</button>
                    </>
                )
            }
        }
    ]

    return (
        <>
        <div className='container'>

           <div className='row'>
                <div className='col-md-12 text-right'>
                    <button className='btn btn-success'
                        onClick={e => {adicionar()}}>Cadastrar</button>       
                </div>
           </div>

           <DataTable
            title="Lista de Fabricantes"
            columns={columns}
            data={data}
            striped="true"
            pagination="true"
            />

        </div>

           <Modal size={'xl'} show={modal} onHide={() => fecharModal()}>
                <Modal.Header>
                    <Modal.Title>Fabricante</Modal.Title>
                    <button type='button' className='close'
                        data-mismiss='modal' aria-label='Close'
                        onClick={e => { fecharModal() }}>
                        <i aria-hidden="true" className='ki ki-close' />
                    </button>
                </Modal.Header>
                    <div className='row mt-5 ml-5 mr-5'>
                        <div className='form-group col-md-10'>
                            <label>Nome</label>
                            <input type="text" className='form-control' 
                                onChange={e => {setFormFabricante({...formFabricante, nome: e.target.value})}}
                                value={formFabricante?.nome} />
                        </div>
                        <div className='form-group col-md-2'>
                            <label>Status</label>
                            <select className='form-control'
                                onChange={e => {setFormFabricante({...formFabricante, 
                                    status: e.target.value})}}
                                    value={formFabricante?.status} >
                                <option value="" selected>Selecione</option>
                                <option value="S">Ativo</option>
                                <option value="N">Desativado</option>
                            </select>
                        </div>
                    </div>

                    <div className='row mt-5 ml-5 mr-5'>
                        <div className='form-group col-md-10'>
                            <label>Endereço</label>
                            <input type="text" className='form-control' 
                                onChange={e => {setFormFabricante({...formFabricante, endereco: e.target.value})}}
                                value={formFabricante?.endereco} />
                        </div>
                    </div>
                    <div className='row mt-5 ml-5 mr-5'>
                        <div className='form-group col-md-10'>
                            <label>Cidade</label>
                            <input type="text" className='form-control' 
                                onChange={e => {setFormFabricante({...formFabricante, cidade: e.target.value})}}
                                value={formFabricante?.cidade} />
                        </div>
                    </div>
                    <div className='row mt-5 ml-5 mr-5'>
                        <div className='form-group col-md-10'>
                            <label>Bairro</label>
                            <input type="text" className='form-control' 
                                onChange={e => {setFormFabricante({...formFabricante, bairro: e.target.value})}}
                                value={formFabricante?.bairro} />
                        </div>
                    </div>
                    <div className='row mt-5 ml-5 mr-5'>
                        <div className='form-group col-md-10'>
                            <label>Estado</label>
                            <input type="text" className='form-control' 
                                onChange={e => {setFormFabricante({...formFabricante, estado: e.target.value})}}
                                value={formFabricante?.estado} />
                        </div>
                    </div>

                <Modal.Footer>
                    <button type='button' onClick={e => {fecharModal();}}
                        className='btn btn-secondary'
                        data-dismiss="modal">Fechar</button>
                    <button type='button' onClick={e => {salvar();}}
                        className='btn btn-primary'>Salvar</button>                        
                </Modal.Footer>
           </Modal>
        </>
    )
}

export default withRouter(Teste);
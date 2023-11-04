const usuarioModel = require('../models/cliente.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS);
const path = require('path');
const fs = require('fs');

const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit;

        const cliente = req.cliente;
        
        const clientes = await clienteModel.find({deleted: false}).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron los clientes correctamente",
            data: clientes
        }

        if (page && limit) {
            const totalClientes = await clienteModel.countDocuments({deleted: false});
            const totalPages =  Math.ceil(totalClientes / limit);
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalClientes,
                totalPages,
                currentPage,
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const cliente_id = req.params.id;
        const cliente = await clienteModel.findById(cliente_id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        return res.status(200).json({
            message: "Cliente encontrado exitosamente",
            cliente
        })

    } catch (error) {
        return res.status(500).json({
            message: "Fallo al encontrar el cliente",
            error: error.message
        });
    }
}

const updateParcial = async (req, res) => {
    try {
        const cliente_id = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        }

        const clienteActualizado = await clienteModel.findByIdAndUpdate(cliente_id, datosActualizar);
        
        if (!clienteActualizado) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        return res.status(200).json({
            message: "Cliente actualizado exitosamente"
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "Fallo al actualizar el cliente",
            error: error.message
        });
    }
}

const updateCompleto = async (req, res) => {
    try {
        const cliente_id = req.params.id;
        const datosActualizar = {
            nombre: req.body.nombre || null,
            a_paterno: req.body.a_paterno || null,
            a_materno: req.body.a_materno || null,
            email: req.body.email || null,
            password: req.body.password || null,
            updated_at: new Date()
        }

        const clienteActualizado = await clienteModel.findByIdAndUpdate(cliente_id, datosActualizar);
        
        if (!clienteActualizado) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        return res.status(200).json({
            message: "Cliente actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Fallo al actualizar el cliente",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        let cliente = new clienteModel({
            nombre: req.body.nombre,
            a_paterno: req.body.a_paterno,
            a_materno: req.body.a_materno,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltosBcrypt)
        });
    
        await cliente.save();
    
        return res.status(201).json({
            message: "Cliente creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear el cliente",
            error: error.message
        });
    }
};

const deleteLogico = async (req, res) => {
    try {
        const cliente_id = req.params.id;
        const clienteEliminado = await clienteModel.findByIdAndUpdate(cliente_id, {deleted: true, deleted_at: new Date()});

        if (!clienteEliminado) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            })
        }

        return res.status(200).json({
            message: "Cliente eliminado exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Fallo al eliminar el cliente",
            error: error.message
        })
    }
};

const deleteFisico = async (req, res) => {
    try {
        const cliente_id = req.params.id;
        const clienteEliminado = await clienteModel.findByIdAndDelete(cliente_id);

        if (!clienteEliminado) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        return res.status(200).json({
            message: "Cliente eliminado permanentemente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Fallo al eliminar el cliente",
            error: error.message
        })
    }
};

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    updateParcial,
    updateCompleto,
} 

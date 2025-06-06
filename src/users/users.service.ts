import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

/**
 * Servicio para manejar operaciones CRUD sobre usuarios.
 * Usa una capa de repositorio para separar la lógica de negocio del acceso a datos.
 */
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Obtiene todos los usuarios almacenados.
   * @returns Array de objetos `User`
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  /**
   * Busca un usuario por su ID.
   * @param id - Identificador único del usuario
   * @throws NotFoundException si no se encuentra el usuario
   * @returns Objeto `User`
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Crea un nuevo usuario a partir de los datos proporcionados.
   * @param createUserDto - Datos iniciales del usuario
   * @returns El usuario creado
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  /**
   * Actualiza un usuario existente con nuevos datos.
   * @param id - Identificador único del usuario
   * @param updateUserDto - Nuevos datos parciales del usuario
   * @throws NotFoundException si no se encuentra el usuario
   * @returns El usuario actualizado
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - Identificador único del usuario
   * @throws NotFoundException si no se encuentra el usuario
   */
  remove(id: number): void {
    this.userRepository.delete(id);
  }
}

import { User } from '../entity/user.entity';

/**
 * Clase temporal que simula una capa de acceso a datos para entidades de tipo User.
 * Se usará únicamente para desarrollo local hasta que se integre con PostgreSQL real.
 */
export class UserRepository {
  [x: string]: any;
  private users: User[] = [];

  /**
   * Busca un usuario por su ID (cadena de UUID).
   * @param id - Identificador único del usuario (formato string)
   * @returns El usuario encontrado o undefined si no existe
   */
  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id); // 👈 Ahora ambos son string
  }

  /**
   * Busca un usuario por su correo electrónico.
   * @param email - Correo del usuario
   * @returns El usuario encontrado o undefined si no existe
   */
  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  /**
   * Actualiza un usuario existente con nuevos datos.
   * @param id - Identificador único del usuario (formato string)
   * @param data - Nuevos datos parciales del usuario
   * @throws Error si el usuario no se encuentra
   * @returns El usuario actualizado
   */
  updateUser(id: string, data: Partial<User>): User {
    const index = this.users.findIndex((user) => user.id === id); // 👈 Comparación correcta
    if (index < 0) throw new Error('User not found');

    const updated = {
      ...this.users[index],
      ...data,
      updatedAt: new Date(),
    };

    this.users[index] = updated;
    return updated;
  }

  /**
   * Elimina un usuario por su ID (formato string).
   * @param id - Identificador único del usuario
   * @throws Error si el usuario no se encuentra
   */
  deleteUser(id: string): void {
    const index = this.users.findIndex((user) => user.id === id); // 👈 Comparación correcta
    if (index < 0) throw new Error('User not found');
    this.users.splice(index, 1);
  }

  /**
   * Genera un UUID básico para uso temporal.
   * @returns Un string con formato UUID v4
   */
  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

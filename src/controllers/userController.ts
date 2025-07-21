import { IUser, ApiResponse } from '../types/user.types';
import { CreateUserDtoType } from '../dto/user.dto';
import { Context } from 'elysia';


export const helloWorld = (): string => 'Hello World!';

export const apiHello = (): ApiResponse<IUser> => ({
  hello: 'world'
});


// export const getUser = async (context: Context): Promise<any> => {
//   const { id } = context.params;

//   const user = await userRepository.getUser(Number(id))
  
//   if (!user) {
//     return {
//       error: 'Пользователь не найден'
//     };
//   }

//   return {
//     user
//   };
// };

// export const createUser = async (context: any): Promise<any> => {
//     const { email } = context.body as CreateUserDtoType

//     const user = await userRepository.getUser(undefined, email)
//     console.log(user)
//     if (user) {
//         return {
//         error: 'Пользователь уже существует'
//         };
//     } else {
//         return userRepository.createUser(email)
//     }
// };
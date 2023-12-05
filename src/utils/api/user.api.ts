import axios from "axios";
import { Marauder } from "../../store/marauder/marauder.types";
import { User } from "../../store/user/user.types";

const api = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/users`;

const headers = {
  'Accept': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
}

export async function getSingleUser(userId: string | undefined): Promise<User> {
  const response = await axios({
    method: 'get',
    url:`${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getSingleMarauder(id: string): Promise<Marauder> {
  const response = await fetch(
    `${api}/id/${id}`,
    {
      method: "GET",
      headers: headers,
      next: { revalidate: 10 }
    }
  )
  const data = await response.json();

  return data;
}

export async function getUsers(): Promise<User[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function getMarauders(): Promise<Marauder[]> {
  const response = await axios({
    method: 'get',
    url: api,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function addUser(
  username: string, 
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  emailAddress: string,
  password: string,
  about: string,
  imageLink: string
): Promise<User> {
  const response = await axios({
    method: 'post',
    url: api,
    data: {
      username,
      firstName,
      lastName,
      dateOfBirth,
      emailAddress,
      password,
      about,
      imageLink
    },
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function editUser(
  userId: string,
  formData: FormData
): Promise<User> {
  const response = await axios({
    method: 'put',
    url: `${api}/${userId}`, 
    data: formData,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}

export async function deleteUser(userId: string): Promise<User> {
  const response = await axios({
    method: 'delete',
    url: `${api}/${userId}`,
    headers: headers,
    withCredentials: true
  });
  const result = await response.data;
  return result;
}
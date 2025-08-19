import { Database } from "./supabase";


export type Todo = Database["public"]["Tables"]["todos_test"]["Row"]

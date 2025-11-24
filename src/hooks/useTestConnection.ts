import { useEffect } from "react";
import { supabase } from "../supabaseClient";

export const useTestConnection = () => {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from("movies").select("*").limit(1);

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }
    test();
  }, []);
};

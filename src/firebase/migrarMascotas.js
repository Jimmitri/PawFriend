import data from "../Data";
import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";

const imageUrls = {
  1: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro01.jpeg?alt=media&token=c004a86c-065a-4549-a97d-c808cb99ea5d",
  2: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro02.jpg?alt=media&token=ea224387-26d3-4040-8970-8b558c58225d",
  3: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro03.png?alt=media&token=976509b1-f4a4-4006-a585-5facce331cac",
  4: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro04.webp?alt=media&token=201bc631-26ec-496e-9fe1-574f91483acd",
  5: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro05.jpeg?alt=media&token=a63ca3c5-b965-4c85-a299-965704c84d33",
  6: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro06.jpg?alt=media&token=af60ee07-5aa8-4460-9d3b-f266b0c0ce82",
  7: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro07.png?alt=media&token=e770d062-ca54-454f-a3f4-1bab39e1993f",
  8: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro13.png?alt=media&token=e446e13a-e808-4c02-a0ab-c2725b4f83b8",
  9: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro10.png?alt=media&token=05769740-24fc-4d7f-9392-44e3c4a1efd1",
  10: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro08.jpeg?alt=media&token=d1f8c805-edb9-4f88-8e5e-64adf263e1ee",
  11: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro09.jpg?alt=media&token=aa992364-ec19-4d1c-8df4-f08089dcf874",
  12: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro11.jpeg?alt=media&token=d4be1a44-0c09-485e-8a67-3ca3ae133d3d",
  13: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro12.jpg?alt=media&token=ee9e980a-df3b-4d12-b49d-5229ba5911b6",
  14: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro14.jpeg?alt=media&token=8ee8d341-36a4-47a9-b7cf-f65aca8bd4db",
  15: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fperros%2Fperro15.png?alt=media&token=06bacf09-f072-4d7b-883a-ad2154e6926b",

  16: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato01.jpg?alt=media&token=026f5bc3-e30c-4452-a48c-eb9268630c74",
  17: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato02.jpeg?alt=media&token=d2b5bf59-96ff-4720-9095-342d5a0b7cfa",
  18: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato03.jpg?alt=media&token=2506a963-203d-432d-bdb8-cac58ec4c430",
  19: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato04.jpg?alt=media&token=b875874d-b0b3-46bc-949f-d8ecfa694974",
  20: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato05.jpg?alt=media&token=770c8124-bd80-45cc-9198-1f0bb3b5807a",
  21: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato06.jpg?alt=media&token=d4af8558-1c72-4b1c-ae37-e907a31199ea",
  22: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato07.jpg?alt=media&token=107e64c7-8ac9-4a1a-bc50-d06f92d38f0d",
  23: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato08.jpg?alt=media&token=ee1587e3-ddaf-411f-a8e2-52b0ec951fd5",
  24: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato09.jpeg?alt=media&token=6b59337b-b844-4f1b-92c0-be0c6c72532b",
  25: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato10.jpg?alt=media&token=a0151358-9f41-47e9-9770-52bcc30efc0f",
  26: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato11.png?alt=media&token=6f8dd0e7-7445-4d7c-aa70-9438b5bfaa2c",
  27: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato12.png?alt=media&token=9c6d4c14-813b-47cc-a584-646b3d62afa9",
  28: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato13.jpg?alt=media&token=9630b0de-9e74-4610-a96c-e6594b4536ea",
  29: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato14.jpg?alt=media&token=e464a139-7b72-470c-acc4-44e382dd82cd",
  30: "https://firebasestorage.googleapis.com/v0/b/pawfriend-29ac1.firebasestorage.app/o/mascotas%2Fgatos%2Fgato15.webp?alt=media&token=e5e4b5d2-f687-42c5-ba05-415175a09b81"
};

export async function migrarMascotas() {
  try {
    console.log("Data cargada:", data);
    console.log("Items:", data.items.length);

    for (const item of data.items) {
      console.log("Migrando:", item.title);

      const mascota = {
        id: item.id,
        cid: item.cid,
        title: item.title,
        raza: item.raza,
        sobre: item.sobre,
        descrip: item.descrip,
        image: imageUrls[item.id]
      };

      await setDoc(doc(db, "mascotas", String(item.id)), mascota);
    }

    console.log("Migración completada correctamente");
  } catch (error) {
    console.error("ERROR FIREBASE:", error);
  }
}

console.log("EXPORTANDO MIGRADOR");
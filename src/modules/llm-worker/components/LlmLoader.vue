<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createLlmEngine } from "@/modules/llm-worker/services/create-llm-engine";

const rule = `
Instrucciones:
- Hoy es ${new Date().toLocaleString()} (usa esta fecha como referencia temporal).
- Recibiras un listado de mensajes con el siguiente formato: [fecha y hora de escritura] - [mensaje].
- Lee la lista de mensajes en orden cronológico por timestamp.
- Interpreta correctamente referencias relativas al tiempo de [fecha y hora de escritura] para saber si de lo que se habla ya sucedio, es mañana o en 5 minutos, etc.
- Haz un resumen preciso y claro de los puntos importantes.
- Omite saludos, felicitaciones, reacciones, caracteres raros o emojis, mensajes de “join/leave” o irrelevantes.
- Destaca solo recordatorios, fechas, tareas, decisiones o información clave.
- Si hay varios mensajes relacionados, unifícalos en una sola idea.
`;

const con = [
  {
    user: "juan.cepeda",
    text: "Listo Diego",
    timestamp: "9/26/2025, 4:15:53 PM",
    type: "message",
  },
  {
    user: "juan.cepeda",
    text: "<@U09HARLHQ2Z> has joined the channel",
    timestamp: "9/26/2025, 4:15:28 PM",
    type: "message",
  },
  {
    user: "diego.lopez",
    text: "Atentos, en 5 minutos comienza nuestro webinar de proxies en javascript",
    timestamp: "9/24/2025, 11:49:32 PM",
    type: "message",
  },
  {
    user: "diego.lopez",
    text: "Ready for the birthday countdown, Rocketeers?\nWe have an incredible celebration schedule for you! First, this Friday, we wish @Marcos Lorenzo David a fantastic happy birthday. Then, on Saturday, we'll celebrate @Paulina Sanchez.\nAnd let the party continue, because Sunday is Luz @Luza 's special day. Keep shining, kids!:dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::pig-sing-karaoke::party_blob::pepeflower::dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::pig-sing-karaoke::party_blob::pepeflower::dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot::dancer::skin-tone-2::carlton::cat-roomba-exceptionally-fast::conga_parrot::heartttt::bananadance::birthday_party_parrot::tulip::conga_parrot:",
    timestamp: "9/23/2025, 11:49:55 PM",
    type: "message",
  },
  {
    user: "diego.lopez",
    text: "Happy Day, Crew! :rocket:\nTomorrow is the *final deadline* to submit your September payroll updates to BUK :cattyping:. Please don’t miss it — submitting on time is essential for accurate and efficient payroll processing :money:.",
    timestamp: "9/23/2025, 8:27:40 PM",
    type: "message",
  },
  {
    user: "diego.lopez",
    text: "Este es un mensaje de prueba para ver como la IA resume los chats\n• hacer que lo lea la api\n• dar resumen\n• esto empezó el viernes 20 de septiembre del 2025\n• proximo viaje 5 de diciembre",
    timestamp: "9/23/2025, 6:54:12 PM",
    type: "message",
  },
//   {
//     user: "diego.lopez",
//     text: "<!channel> hey",
//     timestamp: "9/23/2025, 5:02:46 PM",
//     type: "message",
//   },
//   {
//     user: "meridoapp",
//     text: "<@U09GQ7VSZFT> has joined the channel",
//     timestamp: "9/23/2025, 1:43:41 AM",
//     type: "message",
//   },
//   {
//     user: "diego.lopez",
//     text: "hola",
//     timestamp: "9/22/2025, 1:40:35 AM",
//     type: "message",
//   },
//   {
//     user: "diego.lopez",
//     text: "<@U09H42PN708> has joined the channel",
//     timestamp: "9/20/2025, 10:49:48 PM",
//     type: "message",
//   },
]
  .map((message) => `${message.timestamp} - ${message.text}`)
  .join("\n\n");

  console.log(con);


const message = ref("");

onMounted(async () => {
  const model = await createLlmEngine((progress) => {
    console.log(`Progress: ${progress.text} (${progress.progress})`);
  });
  const replyChunks = await model.chat.completions.create({
    
    messages: [
      {
        role: "user",
        content: `${rule}:\n\n${con}`,
      },
    //   {
    //     role: "user",
    //     content: "Resumen del siguiente chat: \n\n" + con,
    //   },
    ],
    stream: true,
    // max_tokens: 1000,
    // temperature: 0.7,
  });

  for await (const chunk of replyChunks) {
    if (chunk.choices && chunk.choices[0]?.delta?.content) {
      message.value += chunk.choices[0].delta.content;
      // Send streaming chunks to popup
      //   console.log(chunk.choices[0].delta.content);
    }
  }
  //   console.log(message.value);
  //   console.log(model);
});
</script>

<template>
  <div>
    <h1>LlmLoader</h1>
    <p>{{ message }}</p>
  </div>
</template>

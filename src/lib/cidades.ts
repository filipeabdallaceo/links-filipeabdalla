/**
 * Cidades sugeridas no dropdown do form de lista de espera.
 * Top capitais BR + opção pra digitar outra cidade.
 */
export const CIDADES_SUGERIDAS = [
  "São Paulo - SP",
  "Rio de Janeiro - RJ",
  "Belo Horizonte - MG",
  "Brasília - DF",
  "Salvador - BA",
  "Fortaleza - CE",
  "Recife - PE",
  "Porto Alegre - RS",
  "Curitiba - PR",
  "Florianópolis - SC",
  "Goiânia - GO",
  "Manaus - AM",
  "Belém - PA",
  "Vitória - ES",
  "Campo Grande - MS",
  "Cuiabá - MT",
  "João Pessoa - PB",
  "Natal - RN",
  "Maceió - AL",
  "Teresina - PI",
] as const;

/** Datas confirmadas das próximas turmas - atualizar aqui quando abrir nova. */
export type ProximaTurma = {
  cidade: string;
  cidadeShort: string;
  uf: string;
  data: string; // ISO date YYYY-MM-DD
  dataLabel: string; // human-friendly
  status: "vagas-abertas" | "lista-espera" | "encerrada";
  bookingUrl?: string; // link de checkout/info
};

export const PROXIMAS_TURMAS: ProximaTurma[] = [
  {
    cidade: "Florianópolis",
    cidadeShort: "Florianópolis",
    uf: "SC",
    data: "2026-05-23",
    dataLabel: "23 · Maio · 2026",
    status: "vagas-abertas",
    bookingUrl: "https://bootcamp.filipeabdalla.com/",
  },
  {
    cidade: "Campo Grande",
    cidadeShort: "Campo Grande",
    uf: "MS",
    data: "2026-07-11",
    dataLabel: "11 · Julho · 2026",
    status: "lista-espera",
  },
  {
    cidade: "Brasília",
    cidadeShort: "Brasília",
    uf: "DF",
    data: "2026-09-19",
    dataLabel: "19 · Setembro · 2026",
    status: "lista-espera",
  },
  {
    cidade: "São Paulo",
    cidadeShort: "São Paulo",
    uf: "SP",
    data: "2026-11-14",
    dataLabel: "14 · Novembro · 2026",
    status: "lista-espera",
  },
];

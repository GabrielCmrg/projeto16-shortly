--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: dersdtcbgjbbvv
--

CREATE TABLE "public"."links" (
    "id" integer NOT NULL,
    "shortUrl" character varying(8) NOT NULL,
    "url" "text" NOT NULL,
    "ownerId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" "date" DEFAULT "now"() NOT NULL
);


ALTER TABLE public.links OWNER TO dersdtcbgjbbvv;

--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: dersdtcbgjbbvv
--

CREATE SEQUENCE "public"."links_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_id_seq OWNER TO dersdtcbgjbbvv;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER SEQUENCE "public"."links_id_seq" OWNED BY "public"."links"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: dersdtcbgjbbvv
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "name" character varying(60) NOT NULL,
    "email" character varying(30) NOT NULL,
    "password" "text" NOT NULL,
    "createdAt" "date" DEFAULT "now"() NOT NULL
);


ALTER TABLE public.users OWNER TO dersdtcbgjbbvv;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dersdtcbgjbbvv
--

CREATE SEQUENCE "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO dersdtcbgjbbvv;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."links" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."links_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: dersdtcbgjbbvv
--

COPY "public"."links" ("id", "shortUrl", "url", "ownerId", "visitCount", "createdAt") FROM stdin;
1	4w3CR3hV	https://google.com	9	1	2022-08-08
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dersdtcbgjbbvv
--

COPY "public"."users" ("id", "name", "email", "password", "createdAt") FROM stdin;
2	luquinhas	l@g.com	$2b$10$3d0hvwodbLhQZ0mXw7vaLOnnYr8iLeaiuCPMG.JbrMkU2VX3CxrCC	2022-08-08
4	<h1></h1>	joao@driven.com.br	$2b$10$GS3wQiypZePtbR7sudXL6u4d4wQU8dQCN61fuddwGmrsrLnLvoruC	2022-08-08
9	luquinhas	ls@g.com	$2b$10$BoDye3jOAZkalHEj4pA1g.TBjITE5YEi4gdJ16OFMunEgAvCyFCEK	2022-08-08
\.


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dersdtcbgjbbvv
--

SELECT pg_catalog.setval('"public"."links_id_seq"', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dersdtcbgjbbvv
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 9, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."links"
    ADD CONSTRAINT "links_pkey" PRIMARY KEY ("id");


--
-- Name: links links_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."links"
    ADD CONSTRAINT "links_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: links links_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dersdtcbgjbbvv
--

ALTER TABLE ONLY "public"."links"
    ADD CONSTRAINT "links_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--


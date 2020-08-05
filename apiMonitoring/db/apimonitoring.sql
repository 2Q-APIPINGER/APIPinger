--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-08-01 11:00:42

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
-- TOC entry 205 (class 1259 OID 16418)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    email text NOT NULL,
    firstname text,
    lastname text,
    username text NOT NULL,
    password text NOT NULL,
    id text NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16396)
-- Name: api; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api (
    id integer NOT NULL,
    url character varying(1000) NOT NULL,
    method character varying(1000) NOT NULL,
    header text,
    body text,
    casetest character varying(1000),
    "time" text,
    file text,
    userid text,
    infofile text
);


ALTER TABLE public.api OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: api_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_id_seq OWNER TO postgres;

--
-- TOC entry 2841 (class 0 OID 0)
-- Dependencies: 202
-- Name: api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_id_seq OWNED BY public.api.id;


--
-- TOC entry 206 (class 1259 OID 16464)
-- Name: expectedresult; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expectedresult (
    result text,
    urlapi text,
    methodapi text,
    headerapi text,
    bodyapi text
);


ALTER TABLE public.expectedresult OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16403)
-- Name: testcase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testcase (
    casetest character varying(256) NOT NULL,
    cycle integer NOT NULL,
    userid text
);


ALTER TABLE public.testcase OWNER TO postgres;

--
-- TOC entry 2703 (class 2604 OID 16399)
-- Name: api id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api ALTER COLUMN id SET DEFAULT nextval('public.api_id_seq'::regclass);


--
-- TOC entry 2709 (class 2606 OID 16438)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- TOC entry 2705 (class 2606 OID 16409)
-- Name: api api_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api
    ADD CONSTRAINT api_pkey PRIMARY KEY (id);


--
-- TOC entry 2707 (class 2606 OID 16407)
-- Name: testcase testcase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testcase
    ADD CONSTRAINT testcase_pkey PRIMARY KEY (casetest);


-- Completed on 2020-08-01 11:00:43

--
-- PostgreSQL database dump complete
--


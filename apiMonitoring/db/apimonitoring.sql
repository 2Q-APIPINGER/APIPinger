--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-04-11 16:02:49

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
-- TOC entry 203 (class 1259 OID 16396)
-- Name: api; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api (
    id integer NOT NULL,
    url character varying(1000) NOT NULL,
    method character varying(1000) NOT NULL,
    header text,
    body text,
    casetest character varying(1000)
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
-- TOC entry 2831 (class 0 OID 0)
-- Dependencies: 202
-- Name: api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_id_seq OWNED BY public.api.id;


--
-- TOC entry 204 (class 1259 OID 16403)
-- Name: testcase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testcase (
    casetest character varying(256) NOT NULL,
    cycle integer NOT NULL
);


ALTER TABLE public.testcase OWNER TO postgres;

--
-- TOC entry 2692 (class 2604 OID 16399)
-- Name: api id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api ALTER COLUMN id SET DEFAULT nextval('public.api_id_seq'::regclass);


--
-- TOC entry 2824 (class 0 OID 16396)
-- Dependencies: 203
-- Data for Name: api; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api (id, url, method, header, body, casetest) FROM stdin;
3	https://endpointff.eyeq.tech/recognize	post	{\\"Authorization\\":\\"Bearer eFS3oJaQhRU1c5EajQUL\\"}	{\\"\\":\\"\\"}	
4	https://endpointff.eyeq.tech/recognize	get	{\\"cde\\":\\"abc\\"}	{\\"cd\\":\\"cdef\\"}	
5	https://apirequest.eyeq.tech/ekyc/match	post	{\\"jsonFormHeader\\":\\"111\\"}	{\\"jsonForm\\":\\"\\"}	
6	https://apirequest.eyeq.tech/ekyc/match	post	{\\"jsonFormHeader\\":\\"111\\"}	{\\"jsonForm\\":\\"\\"}	
7	https://apirequest.eyeq.tech/ekyc/match	post	{\\"Authorization\\":\\"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlpqUm1ZVE13TlRKak9XVTVNbUl6TWpnek5ESTNZMkl5TW1JeVkyRXpNamRoWmpWaU1qYzBaZz09In0.eyJzdWIiOiJxdWFuLnBoYW5AY2FyYm9uLnN1cGVyIiwiYmFja2VuZEp3dCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlJc0luZzFkQ0k2SWxwcVVtMVpWRTEzVGxSS2FrOVhWVFZOYlVsNlRXcG5lazVFU1ROWk1rbDVUVzFKZVZreVJYcE5hbVJvV21wV2FVMXFZekJhWnowOUluMD0uZXlKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5MWMyVnlibUZ0WlNJNkluRjFZVzR1Y0doaGJpSXNJbWgwZEhBNlhDOWNMM2R6YnpJdWIzSm5YQzlqYkdGcGJYTmNMM0p2YkdVaU9sc2lTVzUwWlhKdVlXeGNMM04xWW5OamNtbGlaWElpTENKSmJuUmxjbTVoYkZ3dlpYWmxjbmx2Ym1VaUxDSkJjSEJzYVdOaGRHbHZibHd2Wm1GalpTSXNJa2x1ZEdWeWJtRnNYQzl6Wld4bWMybG5iblZ3SWl3aVFYQndiR2xqWVhScGIyNWNMMlZyZVdNaUxDSkJjSEJzYVdOaGRHbHZibHd2Y1hWaGJpNXdhR0Z1WDBWTFdVTmZVRkpQUkZWRFZFbFBUaUpkTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5aGNIQnNhV05oZEdsdmJuUnBaWElpT2lJeE1GQmxjazFwYmlJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wydGxlWFI1Y0dVaU9pSlFVazlFVlVOVVNVOU9JaXdpYVhOeklqb2lkM052TWk1dmNtZGNMM0J5YjJSMVkzUnpYQzloYlNJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wyRndjR3hwWTJGMGFXOXVibUZ0WlNJNklrVkxXVU1pTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5bGJtUjFjMlZ5SWpvaWNYVmhiaTV3YUdGdVFHTmhjbUp2Ymk1emRYQmxjaUlzSW1oMGRIQTZYQzljTDNkemJ6SXViM0puWEM5amJHRnBiWE5jTDJWdVpIVnpaWEpVWlc1aGJuUkpaQ0k2SWkweE1qTTBJaXdpYUhSMGNEcGNMMXd2ZDNOdk1pNXZjbWRjTDJOc1lXbHRjMXd2WjJsMlpXNXVZVzFsSWpvaWNHaGhiaUlzSW1oMGRIQTZYQzljTDNkemJ6SXViM0puWEM5amJHRnBiWE5jTDJGd2NHeHBZMkYwYVc5dVZWVkpaQ0k2SWpJNU1tRXpNakExTFdSbE1HUXROREpqTXkxaU5UVXhMV0psTlRNNE5tVTBOR000TnlJc0ltaDBkSEE2WEM5Y0wzZHpiekl1YjNKblhDOWpiR0ZwYlhOY0wzTjFZbk5qY21saVpYSWlPaUp4ZFdGdUxuQm9ZVzRpTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5bGJXRnBiR0ZrWkhKbGMzTWlPaUl4TmpFeU5UTXlRSE4wZFdSbGJuUXVhR050ZFhNdVpXUjFMblp1SWl3aWFIUjBjRHBjTDF3dmQzTnZNaTV2Y21kY0wyTnNZV2x0YzF3dmJHRnpkRzVoYldVaU9pSnhkV0Z1SWl3aVpYaHdJam94TlRneU56Z3dNVEUzTENKb2RIUndPbHd2WEM5M2MyOHlMbTl5WjF3dlkyeGhhVzF6WEM5aGNIQnNhV05oZEdsdmJtbGtJam9pTXpJMkluMD0uT0ptYWlhanRVZ01fYUU0V2pORG41Nk1CQ3BnVDN1ZVhYN2pJbXpyUnpkbERFMlhzUll5cEVfVHJaVXFYQnBpNHhlUHNaMDZTengxQjU2ODdfQjZfNnJsWjNZeUhjenprUWFOLVNZVzlhdUhONEdaS2E4TGt3VmpudF9jeWhsT2dxMkE5c3g3RF94YUd3ZGJ6SzJQQ3V2U2o1Tk5UeEpmazczUEtzT0ZETXNzc1A2WVpVY3FqSURKOXo1dUtERVFaVHRHNmxLQ08yZ2w5SFFMbjBiRDA5NDVfdXhmQWVNMFdpS0tnampKNXdRWnV5aEN5MGdiVjhXd0tTMGhxT0hoWkFwX3l3R0lzLWlLVEp2RlMtZ01aX1NIeURTUUVDeUVnUk8xalYzOXhaV183UEQ3enkyeVU0SjFack9RSE1HZE5YMFpTYTFORDhnbU40bFpUVHRHNWZBPT0iLCJpc3MiOiJodHRwczpcL1wvMTkyLjE2OC4xLjMzOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJHb2xkIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOi0xLCJzcGlrZUFycmVzdFVuaXQiOiJOQSJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJFa3ljIiwiY29udGV4dCI6IlwvZWt5Y1wvdjEiLCJwdWJsaXNoZXIiOiJleWVxc3RvcmUiLCJ2ZXJzaW9uIjoidjEiLCJzdWJzY3JpcHRpb25UaWVyIjoiR29sZCJ9XSwiYXVkIjoiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5IiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJxdWFuLnBoYW4iLCJ0aWVyIjoiMTBQZXJNaW4iLCJuYW1lIjoiRUtZQyIsImlkIjozMjYsInV1aWQiOm51bGx9LCJzY29wZSI6ImFtX2FwcGxpY2F0aW9uX3Njb3BlIGVreWNfc3Vic2NyaWJlciIsImNvbnN1bWVyS2V5IjoiY1ZhaXZPY1FvOENIZlRkTldmRzhsZXBNbnJ3YSIsImV4cCI6MTU5MDU1NTIxNywiaWF0IjoxNTgyNzc5MjE3LCJqdGkiOiIzOTA3OGNiNC04ZTMxLTQxN2ItYTZkZi0wZTYzOWNmZjNjNDYifQ.Y2gQ3-Cf-Ho9D0k-AlKtP2dEvG7gnIxJxwRZtO9ZNidASE23zTEvQopt0tmaPXAWK1osKV4sMqu5h2RX6sfrXwVQs4JYkdF5KG2ZPaacOf6AVtPAn_ASjJQZ0ArlCUS4-4bHH_F5eSvBvK8uCf4WRNSQcIw8klE51YPZAMg6lX9h6nGKtE5G5XAv2isiHAYk2htlSXXyska0p_3a_gt_1JYtEUYxoChBmRCi_-nqg4A_AvmrByQyrMuUpkHnI1PaTQalFBW3BgBgabkVA6Ajci_WWsmYuTjrBJBRTc3_LaSladeNoVMJISkxQpLSHdMzqSVk6BEzN1jCX6C-FQbzyA\\",\\"Content-Type\\":\\"multipart/form-data; boundary=--------------------------070917261639122214163647\\"}	{\\"photo\\":{\\"value\\":{\\"_readableState\\":{\\"objectMode\\":false,\\"highWaterMark\\":65536,\\"buffer\\":{\\"head\\":null,\\"tail\\":null,\\"length\\":0},\\"length\\":0,\\"pipes\\":null,\\"pipesCount\\":0,\\"flowing\\":null,\\"ended\\":false,\\"endEmitted\\":false,\\"reading\\":false,\\"sync\\":true,\\"needReadable\\":false,\\"emittedReadable\\":false,\\"readableListening\\":false,\\"resumeScheduled\\":false,\\"paused\\":true,\\"emitClose\\":false,\\"autoDestroy\\":false,\\"destroyed\\":false,\\"defaultEncoding\\":\\"utf8\\",\\"awaitDrain\\":0,\\"readingMore\\":false,\\"decoder\\":null,\\"encoding\\":null},\\"readable\\":true,\\"_events\\":{},\\"_eventsCount\\":1,\\"path\\":\\"public\\\\images\\\\89346160_504295297181702_4789502019578626048_n.jpg\\",\\"fd\\":null,\\"flags\\":\\"r\\",\\"mode\\":438,\\"end\\":null,\\"autoClose\\":true,\\"bytesRead\\":0,\\"closed\\":false},\\"options\\":{\\"filename\\":\\"89346160_504295297181702_4789502019578626048_n.jpg\\",\\"contentType\\":\\"image/jpeg\\"}},\\"id\\":{\\"value\\":{\\"_readableState\\":{\\"objectMode\\":false,\\"highWaterMark\\":65536,\\"buffer\\":{\\"head\\":null,\\"tail\\":null,\\"length\\":0},\\"length\\":0,\\"pipes\\":null,\\"pipesCount\\":0,\\"flowing\\":null,\\"ended\\":false,\\"endEmitted\\":false,\\"reading\\":false,\\"sync\\":true,\\"needReadable\\":false,\\"emittedReadable\\":false,\\"readableListening\\":false,\\"resumeScheduled\\":false,\\"paused\\":true,\\"emitClose\\":false,\\"autoDestroy\\":false,\\"destroyed\\":false,\\"defaultEncoding\\":\\"utf8\\",\\"awaitDrain\\":0,\\"readingMore\\":false,\\"decoder\\":null,\\"encoding\\":null},\\"readable\\":true,\\"_events\\":{},\\"_eventsCount\\":1,\\"path\\":\\"public\\\\images\\\\89631268_1440755999432210_4149835819877662720_n.jpg\\",\\"fd\\":null,\\"flags\\":\\"r\\",\\"mode\\":438,\\"end\\":null,\\"autoClose\\":true,\\"bytesRead\\":0,\\"closed\\":false},\\"options\\":{\\"filename\\":\\"89631268_1440755999432210_4149835819877662720_n.jpg\\",\\"contentType\\":\\"image/jpeg\\"}}}	
\.


--
-- TOC entry 2825 (class 0 OID 16403)
-- Dependencies: 204
-- Data for Name: testcase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testcase (casetest, cycle) FROM stdin;
\.


--
-- TOC entry 2832 (class 0 OID 0)
-- Dependencies: 202
-- Name: api_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_id_seq', 1, false);


--
-- TOC entry 2694 (class 2606 OID 16409)
-- Name: api api_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api
    ADD CONSTRAINT api_pkey PRIMARY KEY (id);


--
-- TOC entry 2696 (class 2606 OID 16407)
-- Name: testcase testcase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testcase
    ADD CONSTRAINT testcase_pkey PRIMARY KEY (casetest);


-- Completed on 2020-04-11 16:02:50

--
-- PostgreSQL database dump complete
--


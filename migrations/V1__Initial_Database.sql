--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

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

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: device_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.device_log (
    "deviceId" uuid NOT NULL,
    "time" timestamp without time zone DEFAULT now() NOT NULL,
    content jsonb NOT NULL
);


ALTER TABLE public.device_log OWNER TO postgres;

--
-- Name: tracking_device; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tracking_device (
    "deviceId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    owner uuid NOT NULL
);


ALTER TABLE public.tracking_device OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "userId" uuid DEFAULT public.gen_random_uuid() NOT NULL,
    lastname text NOT NULL,
    firstname text NOT NULL,
    phone text,
    email text,
    address text,
    password text NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: device_log device_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.device_log
    ADD CONSTRAINT device_log_pkey PRIMARY KEY ("deviceId");


--
-- Name: tracking_device tracking_device_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracking_device
    ADD CONSTRAINT tracking_device_pkey PRIMARY KEY ("deviceId");


--
-- PostgreSQL database dump complete
--


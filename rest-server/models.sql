create database sensornode;

CREATE TABLE IF NOT EXISTS humidity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    humidity int NOT NULL,
    date_h DATE,
    hour varchar(10)
);

CREATE TABLE IF NOT EXISTS temperature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temp int NOT NULL,
    date_h DATE,
    hour varchar(10)
);


CREATE TABLE IF NOT EXISTS user_a (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci varchar(100) NOT NULL,
    name varchar(100),
    lastname varchar(100),
    surname varchar(100),
    address varchar(100),
    cellphone varchar(100),
    email varchar(100),
    username varchar(100),
    password varchar(100),
    role ENUM('USER_ROLE', 'ADMIN_ROLE') default 'USER_ROLE',
    state bool default true
);

insert into humidity(humidity, date_h, hour) values (24,'2020-11-24', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-11-25', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-11-26', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-11-27', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-11-28', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-11-29', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-11-30', '10:12:23');
insert into humidity(humidity, date_h, hour) values (24,'2020-12-01', '10:12:23');


insert into temperature(temp, date_h, hour) values (24,'2020-11-24', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-11-25', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-11-26', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-11-27', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-11-28', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-11-29', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-11-30', '10:12:23');
insert into temperature(temp, date_h, hour) values (24,'2020-12-01', '10:12:23');


-- select * from humidity as h
-- inner join temperature as t on h.date_h = t.date_h

-- select h.date_h,  avg(t.temp) as promedio_temp, avg(h.humidity) as promedio_humedad, max(h.humidity) as max_humedad, min(h.humidity) as min_humedad, max(t.temp) as max_temperatura, min(t.temp) as min_temperatura from humidity as h
-- inner join temperature as t on h.date_h = t.date_h
-- where h.date_h BETWEEN 
--      CAST( '2020-09-21'  AS DATE) AND 
--      CAST( '2020-09-27'  AS DATE)
-- GROUP BY h.date_h



-- insert into user_a(ci, name, lastname, surname, address, cellphone, email, username, password) values ('234324 tja', 'Alex', 'Mamani', 'Yucra', 'Av la paz', '6565634', 'alex@af.com', 'alex', 'alex')




-- select h.date_h, h.date_h as fecha,  avg(t.temp) as promedio_temp, avg(h.humidity) as promedio_humedad, max(h.humidity) as max_humedad, min(h.humidity) as min_humedad, max(t.temp) as max_temperatura, min(t.temp) as min_temperatura from humidity as h
-- inner join temperature as t on h.date_h = t.date_h
-- where  
-- $X{BETWEEN, h.date_h ,  date_report_init,  date_report_end } 
-- GROUP BY fecha




-- SELECT ROW_NUMBER ( ) OVER (ORDER BY sales.id),
-- 	sales.code,
-- 	users.ci as ci_vendedor,
-- 	customers.ci as ci_cliente,
-- 	sales.total_sale*0.01 as total_sale,
--     ( SELECT sum(sales.total_sale*0.01) as sum_total_sales FROM sales 
--     WHERE $X{BETWEEN, sales.created_at,  date_report_init,  date_report_end } )
-- FROM sales
-- 	INNER JOIN customers ON 
-- 	 customers.id = sales.customer_id 
-- 	INNER JOIN users ON 
-- 	 sales.user_id = users.id 
-- WHERE 
-- 	 $X{BETWEEN, sales.created_at,  date_report_init,  date_report_end }


select ROW_NUMBER ( ) OVER (ORDER BY h.date_h) as nro,   SUBSTRING_INDEX(  SUBSTRING_INDEX( h.date_h, " ", 1) , "-", -2 ) as fecha,  SUBSTRING_INDEX( h.date_h, " ", 1)  as fecha_format , h.date_h ,  avg(h.humidity) as promedio_humedad,  max(t.temp) as max_temperatura, min(t.temp) as min_temperatura from humidity as h
inner join temperature as t on h.date_h = t.date_h
where  
h.date_h BETWEEN 
     DATE_SUB(NOW(),INTERVAL 8 DAY)
     and NOW()
GROUP BY  h.date_h



set @numero=0; select @numero:=@numero+1 as nro, SUBSTRING_INDEX(  SUBSTRING_INDEX( h.date_h, " ", 1) , "-", -2 ) as fecha,  SUBSTRING_INDEX( h.date_h, " ", 1)  as fecha_format , h.date_h ,  avg(h.humidity) as promedio_humedad,  max(t.temp) as max_temperatura, min(t.temp) as min_temperatura from humidity as h inner join temperature as t on h.date_h = t.date_h where   h.date_h BETWEEN       DATE_SUB(NOW(),INTERVAL 8 DAY)      and NOW() GROUP BY  h.date_h
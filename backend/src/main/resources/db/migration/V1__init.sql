CREATE TABLE AVATARS (
  ID int(11) NOT NULL AUTO_INCREMENT,
  EMAIL varchar(255) NOT NULL,
  NAME varchar(255) NOT NULL,
  PIC varchar(4000) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE SNACKS (
  ID int(11) NOT NULL AUTO_INCREMENT,
  NAME varchar(255) NOT NULL,
  PIC varchar(4000) NOT NULL,
  PRICE int(11) NOT NULL CHECK (PRICE >= 0),
  OWNER_ID int(11) DEFAULT NULL,
  PRIMARY KEY (ID),
  KEY FK_OWNER_ID (OWNER_ID),
  CONSTRAINT FK_OWNER_ID FOREIGN KEY (OWNER_ID) REFERENCES AVATARS (ID)
);

CREATE TABLE TRANSACTIONS (
  ID int(11) NOT NULL AUTO_INCREMENT,
  PAID bit(1) DEFAULT NULL,
  TRANSACTION_DATE datetime(6) DEFAULT NULL,
  BUYER_ID int(11) DEFAULT NULL,
  SNACK_ID int(11) DEFAULT NULL,
  PRIMARY KEY (ID),
  KEY FK_BUYER_ID (BUYER_ID),
  KEY FK_SNACK_ID (SNACK_ID),
  CONSTRAINT FK_BUYER_ID FOREIGN KEY (BUYER_ID) REFERENCES AVATARS (ID),
  CONSTRAINT FK_SNACK_ID FOREIGN KEY (SNACK_ID) REFERENCES SNACKS (ID)
);
INSERT INTO `tbl_users` VALUES (1,1,'test1','123456','wangdaiqiang','510622199308152716','四川省绵竹市','618200','18281865016','25','453831794@qq.com','1,2,3,0','0','13','0','19-9-2017','0','0','抢劫','0','9859598','华盛顿','0','0','狙击手','2017-09-20');
INSERT INTO `tbl_userschool` VALUES (1,'绵竹实验中学','绵竹滨河路东段','20-06-2009','无','初中','1',1),(2,'绵竹中学','绵竹新城','20-06-2012','理科','高中','1',1),(3,'四川文理学院','达州南坝街','20-06-2016','计算机科学与技术','本科','2',1),(4,'清华大学','北京','20-06-2019','计算机','硕士','2',1);
INSERT INTO `tbl_userworks` VALUES (1,'四川有乐信息技术有限公司','张国良','成都市高新区益州大道移动互联创业大厦1011','658741','18281865044','8','前端工程师','01-12-2015','19-09-2017','3000','7000','技术提升不够','在公司学到了很多东西','0',1);
INSERT INTO `tbl_userreferences` VALUES (1,'熟人信息一',1),(2,'熟人信息二',1);

INSERT INTO `tbl_users` VALUES (2,2,'test2','123456','wangdaiqiang','510622199308152716','四川省绵竹市','618200','18281865016','25','453831794@qq.com','1,2,3,0','0','13','0','19-9-2017','0','0','抢劫','0','9859598','华盛顿','0','0','狙击手','2017-09-20');
INSERT INTO `tbl_userschool` VALUES (5,'绵竹实验中学','绵竹滨河路东段','20-06-2009','无','初中','1',2),(6,'绵竹中学','绵竹新城','20-06-2012','理科','高中','1',2),(7,'四川文理学院','达州南坝街','20-06-2016','计算机科学与技术','本科','2',2),(8,'清华大学','北京','20-06-2019','计算机','硕士','2',2);
INSERT INTO `tbl_userworks` VALUES (2,'四川有乐信息技术有限公司','张国良','成都市高新区益州大道移动互联创业大厦1011','658741','18281865044','8','前端工程师','01-12-2015','19-09-2017','3000','7000','技术提升不够','在公司学到了很多东西','0',2);
INSERT INTO `tbl_userreferences` VALUES (3,'熟人信息一',2),(4,'熟人信息二',2);


DELETE tbl_users,tbl_userschool,tbl_userworks,tbl_userreferences FROM tbl_users LEFT JOIN tbl_userschool ON tbl_userschool.userId=tbl_users.id AND tbl_users.id=2 LEFT JOIN tbl_userworks ON tbl_userworks.userId=tbl_users.id AND tbl_users.id=2 LEFT JOIN tbl_userreferences ON tbl_userreferences.userId=tbl_users.id AND tbl_users.id=2 
WHERE (tbl_userschool.userId=tbl_users.id ) OR (tbl_userworks.userId=tbl_users.id) OR (tbl_userreferences.userId=tbl_users.id) OR (tbl_users.id=2);


DELETE u,w,s,r FROM tbl_users AS u INNER JOIN tbl_userschool AS s ON s.userId=u.id INNER JOIN tbl_userworks AS w ON w.userId=u.id INNER JOIN tbl_userreferences AS r ON r.userId=u.id 
WHERE (s.userId=u.id AND u.id=2) OR (w.userId=u.id AND u.id=2) OR (r.userId=u.id AND u.id=2) OR (u.id=2);
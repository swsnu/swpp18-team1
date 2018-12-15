from locust import HttpLocust, TaskSet, task

class LoadTask(TaskSet):
    def on_start(self):
        pass

    def on_stop(self):
        pass

    # @task(1)
    # def index_page(self):
    #     self.client.get('/')

    @task(1)
    def get_channel(self):
        self.client.get('http://localhost:8080/api/channel/XcllG')

class WebsiteUser(HttpLocust):
    task_set = LoadTask
    min_wait = 3000
    max_wait = 8000

# class UserBehavior(TaskSet):
#     domain = 'http://localhost:8000/'
#     apiurl = 'api/'
#     authentication_url = 'authentication/'
#     group_url = 'group/'
#     room_url = 'room/'
#     mail_url = 'signupmail'
#
#     # def on_start(self):
#     #     """ on_start is called when a Locust start before any task is scheduled """
#     #     # self.getuser()
#     #     # self.token()
#     #     # self.duplicate()
#     #     self.signup()
#     #     # self.signupmail()
#     #     # self.signin()
#
#     # def on_stop(self):
#     #     """ on_stop is called when the TaskSet is stopping """
#     #     # self.signout()
#
#     @task(2)
#     def token(self):
#         response = self.client.get(self.domain + self.apiurl + self.authentication_url + "token")
#         self.csrftoken = response.cookies['csrftoken']
#
#     # @seq_task(1)
#     # def signup(self):
#     #     response = self.client.get(self.domain + self.apiurl + self.authentication_url + "token")
#     #     csrftoken = response.cookies['csrftoken']
#
#     #     response = self.client.post(self.domain + self.apiurl + self.authentication_url + "signup", json.dumps({
#     #         'email': '1@snu.ac.kr', 'password': '1111111p', 'nickname': 'qwer', 'gender': 'male', 'age': 2, 'university': 'sasfds'
#     #     }), headers={"X-CSRFToken": csrftoken}, cookies={"csrftoken": csrftoken})
#
#     @task(1)
#     def signin(self):
#         response = self.client.get(self.domain + self.apiurl + self.authentication_url + "token")
#         csrftoken = response.cookies['csrftoken']
#
#         self.client.post(self.domain + self.apiurl + self.authentication_url + "signin", json.dumps({
#             'email': '1@snu.ac.kr', 'password': '1111111p'
#         }), headers={"X-CSRFToken": csrftoken}, cookies={"csrftoken": csrftoken})
#
#     @task(1)
#     def signout(self):
#         self.client.get(self.domain + self.apiurl + self.authentication_url + "signout")
#
#     @task(2)
#     def getuser(self):
#         self.client.get(self.domain + self.apiurl + self.authentication_url + "getuser")
#
#     @task(2)
#     def duplicate(self):
#         self.client.get(self.domain + self.apiurl + self.authentication_url + "duplicate")
#
#     # @task(1)
#     # def signupmail(self):
#     #     response = self.client.get(self.domain + self.apiurl + self.authentication_url + "token")
#     #     csrftoken = response.cookies['csrftoken']
#
#     #     self.client.post(self.domain + self.apiurl + "signupmail/", json.dumps({
#     #         'email': '1@snu.ac.kr'
#     #     }), headers={"X-CSRFToken": csrftoken}, cookies={"csrftoken": csrftoken})
#
#     @task(1)
#     def group_create(self):
#         response = self.client.get(self.domain + self.apiurl + self.authentication_url + "token")
#         csrftoken = response.cookies['csrftoken']
#
#         self.client.post(self.domain + self.apiurl + self.group_url + "create", json.dumps({
#             'numberOfMembers': 1, 'date': '2020-11-04', 'areaCity': 'seoul', 'areaGu': 'gwankak', 'members': ['titu']
#             }), headers={"X-CSRFToken": csrftoken}, cookies={"csrftoken": csrftoken})
#
#     @task(50)
#     def group_list(self):
#         self.client.get(self.domain + self.apiurl + self.group_url + "list")
#
#     @task(2)
#     def group_id(self):
#         self.client.get(self.domain + self.apiurl + self.group_url + "1/")
#
#     @task(1)
#     def group_rating(self):
#         response = self.client.get(self.domain + self.apiurl + self.authentication_url + "token")
#         csrftoken = response.cookies['csrftoken']
#
#         self.client.put(self.domain + self.apiurl + self.group_url + "1/" +"rating", json.dumps({
#             'groupRating': 1, 'oppositeGroupId': 3
#             }), headers={"X-CSRFToken": csrftoken}, cookies={"csrftoken": csrftoken})
#
#     @task(10)
#     def room_id(self):
#         self.client.get(self.domain + self.apiurl + self.room_url + '1/')
#
#     @task(10)
#     def room_message(self):
#         self.client.get(self.domain + self.apiurl + self.room_url + '1/' + 'messages/' + '0/' + '1/')
#
#
# class WebsiteUser(HttpLocust):
#     task_set = UserBehavior
#     min_wait = 5000
#     max_wait = 9000

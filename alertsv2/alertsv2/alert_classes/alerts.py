from abc import ABC, abstractmethod
from datetime import datetime, date
from alertsv2.policy import Policy

class Alert(ABC):
    def __init__(self, policy: Policy):
        self.policy = policy
        self.policy.add_field("Today", datetime.strptime("2025-02-13", '%Y-%m-%d').date())
        self.alert_id = self.alert_id()
        self.alert_value = self.alert_value()
        self.alert_description = self.alert_description()
        self.add_extra_fields()
        self.data_meeting_condition = self.condition()

    @property
    @abstractmethod
    def alert_id(self):
        pass

    @property
    @abstractmethod
    def alert_description(self):
        pass
    
    @abstractmethod
    def condition(self):
        pass

    @abstractmethod
    def add_extra_fields(self):
        pass

    @abstractmethod
    def alert_value(self):
        pass

    def days_until_date(self, date_column, days_until_column_name):
        self.policy.add_field(days_until_column_name, self.policy)
        self.policies[days_until_column_name] = pd.to_timedelta(self.policies[date_column] - self.policies['Today']).dt.days


class DQAlert(Alert):
    def __init__(self, policy):
        super().__init__(policy)
        self.alert_type = "DQ"


class FAAlert(Alert):
    def __init__(self, policy):
        super().__init__(policy)
        self.alert_type = "FA"


class NoAlert(Alert):
    def __init__(self, policy):
        super().__init__(policy)
        self.alert_type = "NoAlert"
        

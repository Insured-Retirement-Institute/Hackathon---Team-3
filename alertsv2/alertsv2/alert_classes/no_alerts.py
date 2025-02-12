from alertsv2.alert_classes.alerts import NoAlert
from alertsv2.policy import Policy

class BaseNoAlert(NoAlert):
    def __init__(self, policy: Policy):
        super().__init__(policy)

    def alert_id(self):
        return 1

    def alert_description(self):
        return "No Alert"

    def condition(self):
        return True

    def add_extra_fields(self):
        pass

    def alert_value(self):
        return None
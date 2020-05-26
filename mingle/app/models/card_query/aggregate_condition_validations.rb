#  Copyright 2020 ThoughtWorks, Inc.
#  
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Affero General Public License as
#  published by the Free Software Foundation, either version 3 of the
#  License, or (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Affero General Public License for more details.
#  
#  You should have received a copy of the GNU Affero General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/agpl-3.0.txt>.

class CardQuery  
  class AggregateConditionValidations < Visitor
    include CommonValidations
    attr_writer :validations
    
    TODAY_USED = "#{'TODAY'.bold} is not supported in aggregate condition"
    CURRENT_USER_USED = "#{'CURRENT USER'.bold} is not supported in aggregate condition"
    FROM_TREE_USED = "#{'FROM TREE'.bold} is not supported in aggregate condition"
    THIS_CARD_USED = "#{'THIS CARD'.bold} is not supported in aggregate condition"
    
    def initialize(acceptor)
      acceptor.accept(self)
    end
    
    def execute
      validations.uniq
    end
    
    def validations
      @validations ||= []
    end
    
    def visit_today_comparison(column, operator, today)
      self.validations << TODAY_USED
    end
    
    def visit_from_tree_condition(tree_condition, other_conditions)
      self.validations << FROM_TREE_USED
    end
    
    def visit_is_current_user_condition(column, current_user_login)
      self.validations << CURRENT_USER_USED
    end

  end
end
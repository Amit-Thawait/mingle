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

unless MingleUpgradeHelper.ruby_1_9?
  begin
    require 'base64'
  rescue LoadError
  end

  if defined? ::Base64
    module ::Base64
      def self.urlsafe_encode64(bin)
        [bin].pack("m0").tr("+/", "-_")
      end
      def self.urlsafe_decode64(str)
        str.tr("-_", "+/").unpack("m0").first
      end
    end
  end
end
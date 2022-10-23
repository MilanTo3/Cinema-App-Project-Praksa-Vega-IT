using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class JWTSetting
    {

        private readonly string key;
        
        public JWTSetting() {
            key = "iloveyou!iloveyou!";
        }

        public string Key {
            get { return key; }
        }

    }
}

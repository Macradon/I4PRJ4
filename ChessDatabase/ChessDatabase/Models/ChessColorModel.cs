using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessDatabase.Models
{
    public class ChessColorModel
    {
        public enum ChessColor
        {
            WHITE,
            BLACK
        }

        public ChessColor color { get; set; }
    }
}

using System.ComponentModel;

namespace ApiCapotariaBatista.Models.Enums
{
    public enum ETypeProduction
    {
        [Description("Automotiva")]
        Automotiva = 1,
        [Description("Náutica")]
        Nautical = 2,
        [Description("Aérea")]
        Aerial = 3,
        [Description("Residencial")]
        Residential = 4,
        [Description("Industrial")]
        Industrial = 5
    }
}

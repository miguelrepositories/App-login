using System.ComponentModel;

namespace ApiCapotariaBatista.Models.Enums
{
    public enum EOrderStatus
    {
        [Description("Aceito")]
        Accepted = 1,
        [Description("Finalizado")]
        Finished = 2,
        [Description("Cancelado")]
        CalledOff = 3,
        [Description("Em Execução")]
        Running = 4
    }
}

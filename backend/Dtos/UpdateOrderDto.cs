using ApiCapotariaBatista.Models.Enums;

namespace ApiCapotariaBatista.Dtos
{
    public class UpdateOrderDto
    {
        public string Description { get; set; }
        public DateTime DeliveryForecast { get; set; }
        public EOrderStatus OrderStatus { get; set; }
    }
}
